import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CocktailDetails } from './cocktail-details';

describe('CocktailDetails', () => {
  let component: CocktailDetails;
  let fixture: ComponentFixture<CocktailDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CocktailDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(CocktailDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
