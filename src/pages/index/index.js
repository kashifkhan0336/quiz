import "./index.css";
import "../shared_css/shared.css";
import ArgonStorage from "argon-storage";
const store = new ArgonStorage({ compress: true });
import $ from "jquery";

$(document).ready(function () {
  function login() {
    if (
      $("input[type='email']").val() === "kashif" &&
      $("input[type='password']").val() == "khan"
    ) {
      store.set("auth", btoa("auth_ss"));
      // store.set("c_qz", quiz, true);
      window.location.href = "quizes.html";
    } else {
      alert("Wrong username or password!");
    }
  }
  $(document).on("keypress", function (e) {
    if (e.which == 13) {
      login();
    }
  });
  $(".btn").click(function () {
    login();
    // console.log($("input[type='email']").val());
    // console.log($("input[type='password']").val());
  });
});
