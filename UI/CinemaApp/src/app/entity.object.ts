import {Attribute} from "./attribute";

export interface EntityObject{
  objectId: number;
  objectTypeId: string;
  name: string;
  attributes: Attribute[];
}
