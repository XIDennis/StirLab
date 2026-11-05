import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CocktailCard } from './cocktail-card';

describe('CocktailCard', () => {
  let component: CocktailCard;
  let fixture: ComponentFixture<CocktailCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CocktailCard],
    }).compileComponents();

    fixture = TestBed.createComponent(CocktailCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
