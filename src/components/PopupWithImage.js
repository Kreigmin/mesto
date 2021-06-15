import Popup from "./Popup.js";
import { imageCaption, popupFullImage} from '../utils/constants.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(name, link) {
    super.open();
    console.log(name)
    console.log(link)
    popupFullImage.src = link;
    popupFullImage.alt = name;
    imageCaption.textContent = name;
  }
}
