import ArgonStorage from "argon-storage";
const store = new ArgonStorage({ compress: true });
import "./index.css";
import "../shared_css/shared.css";
import $ from "jquery";
window.$ = $;
if (store.get("user") && store.get("auth") && store.get("c_qz")) {
  $(".result").text(store.get("sc"));
  $(".name > span").text(store.get("user")["u"]);
  $(".roll_number > span").text(store.get("user")["r"]);
  localStorage.clear();
  sessionStorage.clear();
} else {
  localStorage.clear();
  sessionStorage.clear();
  window.location.href = "index.html";
}

