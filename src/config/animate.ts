/**
 * 用来启动 tween.js
 */
import * as TWEEN from "@tweenjs/tween.js";

function animate(time: number) {
    window.requestAnimationFrame(animate);
    TWEEN.update(time);
}
window.requestAnimationFrame(animate);