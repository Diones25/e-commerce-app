import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
@ValidatorConstraint({
  name: 'ProductSpecs',
  async: false
})
export class ProductSpecs implements ValidatorConstraintInterface {

  accepetedSpecs = [
    'ram', 'processor', 'ssd', 'hdd', 'brand', 'model',
    'color', 'weight', 'dimensions', 'material',
    'capacity', 'power', 'voltage', 'warranty',
    'condition', 'chip', 'year', 'other_features',
  ];

  validate(specs: Record<string, string>) {
    const keys = Object.keys(specs);
    if (keys.length === 0) return true; 

    return keys.every(
      (key) => this.accepetedSpecs.includes(key) && specs[key].trim() !== '',
    );
  }
  defaultMessage() {
    return 'As especificações do produto devem ser um objeto válido com especificações suportadas.';
  }
}