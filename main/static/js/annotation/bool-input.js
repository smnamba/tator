class BoolInput extends TatorElement {
  constructor() {
    super();

    const fieldset = document.createElement("fieldset");
    this._shadow.appendChild(fieldset);

    const div = document.createElement("div");
    div.setAttribute("class", "radio-slide-wrap d-flex flex-justify-between flex-items-center");
    fieldset.appendChild(div);

    this._legend = document.createElement("legend");
    div.appendChild(this._legend);

    const controls = document.createElement("div");
    controls.setAttribute("class", "d-flex flex-items-center col-8");
    div.appendChild(controls);

    this._on = document.createElement("input");
    this._on.setAttribute("class", "sr-only");
    this._on.setAttribute("type", "radio");
    this._on.setAttribute("id", "on");
    this._on.setAttribute("name", "asdf");
    this._on.checked = true;
    controls.appendChild(this._on);

    this._onLabel = document.createElement("label");
    this._onLabel.setAttribute("for", "on");
    controls.appendChild(this._onLabel);

    this._off = document.createElement("input");
    this._off.setAttribute("class", "sr-only");
    this._off.setAttribute("type", "radio");
    this._off.setAttribute("id", "off");
    this._off.setAttribute("name", "asdf");
    controls.appendChild(this._off);

    this._offLabel = document.createElement("label");
    this._offLabel.setAttribute("for", "off");
    controls.appendChild(this._offLabel);

    const span = document.createElement("span");
    span.setAttribute("class", "radio-slide rounded-2");
    controls.appendChild(span);

    this._on.addEventListener("change", () => {
      this.dispatchEvent(new Event("change"));
      this._onLabel.blur();
      this._offLabel.blur();
    });

    this._off.addEventListener("change", () => {
      this.dispatchEvent(new Event("change"));
      this._onLabel.blur();
      this._offLabel.blur();
    });

    span.addEventListener("click", () => {
      if (this._on.checked) {
        this._offLabel.click();
      } else {
        this._onLabel.click();
      }
    });
  }

  static get observedAttributes() {
    return ["name", "on-text", "off-text"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "name":
        this._legend.textContent = newValue;
        break;
      case "on-text":
        this._onLabel.textContent = newValue;
        break;
      case "off-text":
        this._offLabel.textContent = newValue;
        break;
    }
  }

  set permission(val) {
    if (!hasPermission(val, "Can Edit")) {
      this._on.setAttribute("readonly", "");
      this._off.setAttribute("readonly", "");
      this._onLabel.addEventListener("click", evt => {
        evt.preventDefault();
      });
      this._offLabel.addEventListener("click", evt => {
        evt.preventDefault();
      });
    }
  }

  set default(val) {
    this._default = val;
  }

  reset() {
    // Go back to default value
    if (typeof this._default !== "undefined") {
      this.setValue(this._default);
    } else {
      this.setValue(false);
    }
  }

  getValue() {
    return this._on.checked;
  }

  setValue(val) {
    if (val) {
      this._on.checked = true;
      this._off.checked = false;
      this._on.setAttribute("checked", "");
      this._off.removeAttribute("checked");
    } else {
      this._on.checked = false;
      this._off.checked = true;
      this._on.removeAttribute("checked");
      this._off.setAttribute("checked", "");
    }
  }
}

customElements.define("bool-input", BoolInput);
