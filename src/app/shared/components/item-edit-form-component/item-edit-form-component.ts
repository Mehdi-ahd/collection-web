import { Component, input, OnInit, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Collection } from '../../interfaces/Collection';
import { RARITIES, CollectionItem, CollectionItemPayload } from '../../interfaces/CollectionItem';

/**
 * Formulaire commun création / édition d'un objet de collection.
 * En mode création (item null) : affiche le sélecteur de collection,
 * pas de bouton Delete. En mode édition : prérempli, bouton Delete.
 */
@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-item-edit-form-component',
  styleUrl: './item-edit-form-component.scss',
  templateUrl: './item-edit-form-component.html',
})
export class ItemEditFormComponent implements OnInit {

  /** Objet à éditer, ou null en mode création. */
  item = input<CollectionItem | null>(null);

  /** Collections disponibles (sélecteur en mode création). */
  collections = input<Collection[]>([]);

  saved = output<{ collectionId: number | null; data: CollectionItemPayload }>();

  cancelled = output<void>();

  deleted = output<void>();

  errorMessage = signal('');

  fileName = signal('');

  rarities = RARITIES;

  itemFormGroup = new FormGroup({
    collection: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    rarity: new FormControl<'Common' | 'Uncommon' | 'Rare' | 'Legendary'>('Common', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    price: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0)],
    }),
    image: new FormControl('', {
      nonNullable: true,
    }),
  });

  ngOnInit(): void {
    const item = this.item();

    if (item) {
      this.itemFormGroup.patchValue({
        name: item.name,
        description: item.description,
        rarity: item.rarity,
        price: item.price,
        image: item.image,
      });
    } else if (this.collections().length > 0) {
      // Pré-sélection de la première collection en mode création.
      this.itemFormGroup.patchValue({ collection: String(this.collections()[0].id) });
    }
  }

  /**
   * Champ invalide ET touché/dirty : évite d'afficher
   * les erreurs avant que l'utilisateur n'ait interagi.
   */
  isFieldValid(fieldName: string): boolean {
    const formControl = this.itemFormGroup.get(fieldName);

    return Boolean(
      formControl?.invalid
      && (formControl.dirty || formControl.touched)
    );
  }

  /**
   * Upload → lecture en base64 (FileReader) → patch du contrôle image.
   * C'est cette chaîne base64 que le backend stocke en TEXT.
   */
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    this.fileName.set(file.name);

    const reader = new FileReader();
    reader.onload = () => {
      this.itemFormGroup.patchValue({ image: reader.result as string });
    };
    reader.readAsDataURL(file);
  }

  submit() {
    if (this.itemFormGroup.invalid) {
      this.itemFormGroup.markAllAsTouched();
      return;
    }

    this.errorMessage.set('');

    const { collection, ...data } = this.itemFormGroup.getRawValue();

    this.saved.emit({
      // null en mode édition : le collectionId n'est pas modifiable
      collectionId: this.item() ? null : Number(collection),
      data,
    });
  }

  cancel() {
    this.cancelled.emit();
  }

  delete() {
    this.deleted.emit();
  }
}
