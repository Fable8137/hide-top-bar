import { extension_settings } from "../../../extensions.js";
import { saveSettings } from "../../../../script.js";

const extensionName = "hide-top-bar";
const extensionFolderPath = `scripts/extensions/third-party/${extensionName}`;
const DRAG_THRESHOLD = 5;

const defaultSettings = {
    hidden: false,
    floatingButton: true,
    buttonPosition: null,
    buttonSize: 32
};

let drag = null;

function getButton() {
    return document.getElementById("hide_top_bar_floating_btn");
}

function clampPosition(x, y, btn) {
    const maxX = Math.max(0, window.innerWidth - btn.offsetWidth);
    const maxY = Math.max(0, window.innerHeight - btn.offsetHeight);
    return {
        x: Math.min(Math.max(0, x), maxX),
        y: Math.min(Math.max(0, y), maxY)
    };
}

function moveButton(btn, x, y) {
    btn.style.left = `${x}px`;
    btn.style.top = `${y}px`;
    btn.style.right = "auto";
}

function applyButtonPosition() {
    const btn = getButton();
    const pos = extension_settings[extensionName]?.buttonPosition;
    if (!btn || !pos) return;
    const clamped = clampPosition(pos.x, pos.y, btn);
    moveButton(btn, clamped.x, clamped.y);
}

function applyState() {
    const settings = extension_settings[extensionName];
    document.body.classList.toggle("hide-top-bar-active", Boolean(settings.hidden));
    document.body.classList.toggle("hide-top-bar-floating-enabled", Boolean(settings.floatingButton));
    document.documentElement.style.setProperty("--hide-top-bar-btn-size", `${settings.buttonSize}px`);
    $("#hide_top_bar_checkbox").prop("checked", Boolean(settings.hidden));
    $("#hide_top_bar_floating_checkbox").prop("checked", Boolean(settings.floatingButton));
    $("#hide_top_bar_size_slider").val(settings.buttonSize);
    $("#hide_top_bar_size_value").text(`${settings.buttonSize}px`);
    applyButtonPosition();
}

function setHidden(value) {
    extension_settings[extensionName].hidden = Boolean(value);
    applyState();
    saveSettings();
    console.log(`[${extensionName}] Hidden:`, Boolean(value));
}

function setFloatingButton(value) {
    extension_settings[extensionName].floatingButton = Boolean(value);
    applyState();
    saveSettings();
    console.log(`[${extensionName}] Floating button:`, Boolean(value));
}

function loadSettings() {
    extension_settings[extensionName] = extension_settings[extensionName] || {};
    for (const [key, value] of Object.entries(defaultSettings)) {
        if (extension_settings[extensionName][key] === undefined) {
            extension_settings[extensionName][key] = value;
        }
    }
    applyState();
}

function onSizeInput(event) {
    extension_settings[extensionName].buttonSize = Number($(event.target).val());
    applyState();
}

function onSizeChange() {
    saveSettings();
    console.log(`[${extensionName}] Button size:`, extension_settings[extensionName].buttonSize);
}

function resetButtonPosition() {
    extension_settings[extensionName].buttonPosition = null;
    const btn = getButton();
    if (btn) {
        btn.style.left = "";
        btn.style.top = "";
        btn.style.right = "";
    }
    saveSettings();
    toastr.info("Button position reset", "Hide Top Bar");
    console.log(`[${extensionName}] Button position reset`);
}

function resetButtonSize() {
    extension_settings[extensionName].buttonSize = defaultSettings.buttonSize;
    applyState();
    saveSettings();
    toastr.info("Button size reset", "Hide Top Bar");
    console.log(`[${extensionName}] Button size reset`);
}

function onHiddenCheckboxChange(event) {
    setHidden($(event.target).prop("checked"));
}

function onFloatingCheckboxChange(event) {
    setFloatingButton($(event.target).prop("checked"));
}

function onPointerDown(event) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const btn = event.currentTarget;
    const rect = btn.getBoundingClientRect();
    drag = {
        id: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        offsetX: event.clientX - rect.left,
        offsetY: event.clientY - rect.top,
        moved: false,
        last: null
    };
    btn.setPointerCapture(event.pointerId);
}

function onPointerMove(event) {
    if (!drag || event.pointerId !== drag.id) return;
    const btn = event.currentTarget;
    const distance = Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY);
    if (!drag.moved && distance < DRAG_THRESHOLD) return;
    drag.moved = true;
    const clamped = clampPosition(event.clientX - drag.offsetX, event.clientY - drag.offsetY, btn);
    moveButton(btn, clamped.x, clamped.y);
    drag.last = clamped;
}

function onPointerUp(event) {
    if (!drag || event.pointerId !== drag.id) return;
    const btn = event.currentTarget;
    try {
        btn.releasePointerCapture(event.pointerId);
    } catch (error) {
        // Capture already released, nothing to do
    }
    const wasDrag = drag.moved;
    const lastPosition = drag.last;
    drag = null;

    if (wasDrag && lastPosition) {
        extension_settings[extensionName].buttonPosition = lastPosition;
        saveSettings();
        console.log(`[${extensionName}] Button moved:`, lastPosition);
    } else {
        setHidden(!extension_settings[extensionName].hidden);
    }
}

function onPointerCancel() {
    drag = null;
}

function onKeyDown(event) {
    if (event.altKey && !event.ctrlKey && !event.metaKey && event.code === "KeyH") {
        event.preventDefault();
        setHidden(!extension_settings[extensionName].hidden);
    }
}

jQuery(async () => {
    console.log(`[${extensionName}] Loading...`);

    try {
        const settingsHtml = await $.get(`${extensionFolderPath}/settings.html`);
        $("#extensions_settings2").append(settingsHtml);

        $("body").append(
            '<div id="hide_top_bar_floating_btn" class="fa-solid fa-bars" title="Show/hide the top bar (drag to move)"></div>'
        );

        const btn = getButton();
        btn.addEventListener("pointerdown", onPointerDown);
        btn.addEventListener("pointermove", onPointerMove);
        btn.addEventListener("pointerup", onPointerUp);
        btn.addEventListener("pointercancel", onPointerCancel);

        $("#hide_top_bar_checkbox").on("input", onHiddenCheckboxChange);
        $("#hide_top_bar_floating_checkbox").on("input", onFloatingCheckboxChange);
        $("#hide_top_bar_size_slider").on("input", onSizeInput);
        $("#hide_top_bar_size_slider").on("change", onSizeChange);
        $("#hide_top_bar_reset_btn").on("click", resetButtonPosition);
        $("#hide_top_bar_reset_size_btn").on("click", resetButtonSize);
        document.addEventListener("keydown", onKeyDown);
        window.addEventListener("resize", applyButtonPosition);
        loadSettings();

        console.log(`[${extensionName}] ✅ Loaded successfully`);
    } catch (error) {
        console.error(`[${extensionName}] ❌ Failed to load:`, error);
    }
});