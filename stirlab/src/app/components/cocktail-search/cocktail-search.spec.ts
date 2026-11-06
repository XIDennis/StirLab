import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CocktailSearch } from './cocktail-search';

describe('CocktailSearch', () => {
  let component: CocktailSearch;
  let fixture: ComponentFixture<CocktailSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CocktailSearch],
    }).compileComponents();

    fixture = TestBed.createComponent(CocktailSearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
