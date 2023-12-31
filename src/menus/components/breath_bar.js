const { LitElement, html, css, unsafeCSS } = require('lit')
const { guiIcons1_17_1 } = require('../hud')

class BreathBar extends LitElement {
  static get styles () {
    return css`
      .breathbar {
        position: absolute;
        display: flex;
        flex-direction: row-reverse;
        left: calc(50% + 91px);
        transform: translate(-100%);
        bottom: 40px;
        --offset: calc(-1 * 16px);
        --bg-x: calc(-1 * 16px);
        --bg-y: calc(-1 * 18px);
      }

      .breath {
        width: 9px;
        height: 9px;
        margin-left: -1px;
      }

      .breath.full {
        background-image: url('${unsafeCSS(guiIcons1_17_1)}');
        background-size: 256px;
        background-position: var(--offset) var(--bg-y);
      }

      .breath.half {
        background-image: url('${unsafeCSS(guiIcons1_17_1)}');
        background-size: 256px;
        background-position: calc(var(--offset) - 9) var(--bg-y);
      }
    `
  }

  gameModeChanged () {
    this.shadowRoot.querySelector('#breathbar').classList.toggle('creative', bot.game.gameMode === 'creative' || bot.game.gameMode === 'spectator')
  }

  updateOxygen (hValue) {
    const breathbar = this.shadowRoot.querySelector('#breathbar')
    breathbar.style.display = 'block'

    const breaths = breathbar.children

    for (const breath of breaths) {
      breath.classList.remove('full')
      breath.classList.remove('half')
    }

    for (let i = 0; i < Math.ceil(hValue / 2); i++) {
      if (i >= breaths.length) break

      if (hValue % 2 !== 0 && Math.ceil(hValue / 2) === i + 1) {
        breaths[i].classList.add('half')
      } else {
        breaths[i].classList.add('full')
      }
    }

    // if (hValue === 20) {
    //   setTimeout(() => {
    //     breathbar.style.display = 'none'
    //   }, 1000)
    // }
  }

  render () {
    return html`
      <div id="breathbar" class="breathbar">
        <div class="breath"></div>
        <div class="breath"></div>
        <div class="breath"></div>
        <div class="breath"></div>
        <div class="breath"></div>
        <div class="breath"></div>
        <div class="breath"></div>
        <div class="breath"></div>
        <div class="breath"></div>
        <div class="breath"></div>
      </div>
    `
  }
}

window.customElements.define('pmui-breathbar', BreathBar)
