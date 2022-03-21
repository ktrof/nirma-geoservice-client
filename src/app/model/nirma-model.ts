export class NirmaModel {
  requestParam: string;
  description: string;
  innerModels: Array<NirmaModel>;

  constructor(requestParam: any, description: string, innerModels: any) {
    this.requestParam = requestParam;
    this.description = description;
    this.innerModels = innerModels;
  }
}
