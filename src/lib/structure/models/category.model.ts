import { Module } from './module.model';

export class Category {
  name: string;
  surname: string;
  id: string;
  modules: Module[];

  constructor(obj?: any) {
    Object.assign(this, obj, {
      modules:
        obj && obj.modules
          ? obj.modules.map((module) => new Module(module.display_id ? module.display_id : module.id, module.text, module.text))
          : null
    });
  }

  public isBaseSkills(): boolean {
    return this.id === 'baseSkills';
  }

  public isRigthtsAccess(): boolean {
    return this.id === 'accessRight';
  }

  public isParentingHelp(): boolean {
    return this.id === 'parentingHelp';
  }

  public isDigitalCultureSecurity(): boolean {
    return this.id === 'digitalCultureSecurity';
  }

  public isSocialAndProfessional(): boolean {
    return this.id === 'socialAndProfessional';
  }
}
