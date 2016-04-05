import ReactDOM from "react-dom";
import React from "react";

import * as Components from "./guiComponents.jsx";
import LayerListSelector from "./layerListSelector.jsx";
import { DialogContainer } from "./dialogs/dialog.jsx";

import PubSub from "../event/pubSub.js";
import Events from "../event/events.js";

export default class GUI {
	constructor(dTile) {
		this.dTile = dTile;
	}

	openDialog(dialog) {
		this.dialogContainer.openDialog(dialog);
	}

	render() {
		ReactDOM.render((
			<div>
				<div id="renderContainer"
					ref={ ref => this.mainRenderContainer = ref } />
				<SidebarCard gui={ this } ref={ ref => this.sidebarCard = ref } />
				<DialogContainer ref={ ref => this.dialogContainer = ref } />
			</div>
		), document.getElementById("app"));
	}
}

class SidebarCard extends React.Component {
	render() {
		return (
			<Components.Card id="mainCard">
				<Components.CardTitle>DTile</Components.CardTitle>
				<Components.MultiSelector
					values={ [ "Pen", "Fill", "Select" ] }
					defaultSelected="0" />
				<hr />
				<Components.Button onClick={ () => {
					PubSub.publish(Events.UNDO_REQUESTED);
				} } text="Undo" />
				<Components.Button onClick={ () => {
					PubSub.publish(Events.REDO_REQUESTED);
				} } text="Redo" />
				<hr />
				<Components.TextInput name="mapName" label="Map Name" />
				<Components.Container title="Layers" contractible>
					<LayerListSelector ref={ ref => this.layerListSelector = ref } />
				</Components.Container>
				<Components.Container title="Tileset" contractible>
					<div id="tilesetSelectorContainer"
						ref={ ref => this.tilesetRenderContainer = ref }>
					</div>
				</Components.Container>
			</Components.Card>
		);
	}
}
