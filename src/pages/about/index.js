document.body.innerHTML = `<h1>About Page</h1>`;
import ArgonStorage from "argon-storage";
const store = new ArgonStorage({ compress: true });
import $ from "jquery";

if (store.get("user") && store.get("auth")) {
  console.log("Authenticated!");
} else {
  console.log("401");
}
