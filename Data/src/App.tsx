/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import { LAppDelegate } from "./ts/live2d/lappdelegate";
import * as LAppDefine from "./ts/live2d/lappdefine";
import React from "react";
import ReactDOM from "react-dom";
import Index from "./index";
import "./scss/foundation/reset.scss";
import "./scss/foundation/variable.scss";
import "./scss/foundation/base.scss";

/**
 * ブラウザロード後の処理
 */
window.onload = (): void => {
  // create the application instance
  if (LAppDelegate.getInstance().initialize() == false) {
    return;
  }

  LAppDelegate.getInstance().run();
};

/**
 * 終了時の処理
 */
window.onbeforeunload = (): void => LAppDelegate.releaseInstance();

/**
 * Process when changing screen size.
 */
window.onresize = () => {
  if (LAppDefine.CanvasSize === "auto") {
    LAppDelegate.getInstance().onResize();
  }
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>
);
