import "./style.css";
import { UI } from "@peasy-lib/peasy-ui";
import { Engine } from "@peasy-lib/peasy-engine";

import { Telemetry, enableTelemetry } from "./testtel";

const model = {
  button: undefined,
  toggle: (e: any, m: any) => {
    if ((m.button as HTMLElement).innerText == "Enable Telemetry") {
      enableTelemetry(true);
      (m.button as HTMLElement).innerText = "Disable Telemetry";
    } else {
      enableTelemetry(false);
      (m.button as HTMLElement).innerText = "Enable Telemetry";
    }
  },
};
const template = `<div> Hello Peasy!!! 
<button \${==>button} \${click@=>toggle}>Enable Telemetry</button>
</div>`;

await UI.create(document.body, model, template).attached;

async function wait(ms: number) {
  return new Promise<void>(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

class myScene {
  engine: Engine;
  constructor() {
    this.engine = Engine.create({ fps: 60, started: true, callback: this.GameLoop });
  }

  @Telemetry()
  async pollForUserInput() {
    await wait(Math.random() * 5);
  }

  @Telemetry()
  async updatePhysics() {
    await wait(Math.random() * 15);
  }

  @Telemetry()
  async updateRenderer() {
    await wait(Math.random() * 7);
  }

  @Telemetry()
  GLstart() {}

  @Telemetry()
  GLend() {}

  GameLoop = () => {
    this.GLstart();

    this.pollForUserInput();
    this.updatePhysics();
    this.updateRenderer();

    this.GLend();
  };
}

let scene = new myScene();
