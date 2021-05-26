import notify from "devextreme/ui/notify";

const Utils = {
  notify: (message = "", type = "info", time = 500) => {
    notify({ message: message, width: "auto" }, type, time);
  },
  isValidUserSlug: (slug) => {
    var validSlug = new RegExp(/^@[A-Za-z\-0-9]+/);
    return validSlug.test(slug);
  },
  tagProcessor: (string) => {
    var tags = [];
    string.split(",").forEach((tag) => {
      if (tag !== "") {
        tags.push({ name: tag.trim().split("#")[1] });
      }
    });
    return tags;
  },
  tagToHashConverter: (data) => {
    if (data !== "") {
      var hashTag = "";
      data.forEach((tag, index) => {
        if (index !== data.length - 1) {
          hashTag += `#${tag.name},`;
        } else {
          hashTag += `#${tag.name}`;
        }
      });
      return hashTag;
    }
  },
  objectToParams: (object) => {
    var params = [];
    for (const key in object) {
      params.push(`${key}=${object[key]}`);
    }
    return params.join("&");
  },
  imgLoadError: (e, DefaultImg) => {
    e.target.src = DefaultImg;
  },
  objToFormData: (obj) => {
    let form = new FormData();
    Object.entries(obj).forEach(([key, value]) => {
      if (value) form.append(key, value);
    });
    return form;
  },
  rangeGenerator: (number) => {
    return [...Array(number).keys()];
  },
  customizeRequest: (e) => {
    var reg = new RegExp(/\'[\w\s\-]+\'/g);
    if ("$filter" in e.params) {
      e.params = {
        q: reg.exec(e.params.$filter)[0],
      };
    }
  },
};
export default Utils;
