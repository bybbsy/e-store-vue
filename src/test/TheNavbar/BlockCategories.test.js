import { render, screen } from '@testing-library/vue';
import BlockCategories from '../../components/TheNavbar/BlockCategories.vue';

test('renders navbar component', () => {
  const { debug } = render(BlockCategories, {
    data: {
      filterItems: [
        {
          mainCategory: 'store',
          baseUrl: 'products',
          authRequired: false,
          filterItems: [
            {
                name: 'Toys',
                icon: 'Light-bulb.png',
                link: 'toys'
            },
            {
                name: 'Health',
                icon: 'Heart.png',
                link: 'health'
            },
            {
                name: 'Food',
                icon: 'Apple.png',
                link: 'food'
            }
          ]
        },
        {
          mainCategory: 'personal',
          baseUrl: 'personal',
          authRequired: true,
          filterItems: [
            {
                name: 'My cart',
                icon: 'Cart.png',
                link: 'cart'
            },
            {
                name: 'Coupons',
                icon: 'Coupon.png',
                link: 'coupons'
            }
          ]
        }
      ]
    }
  });


  screen.debug();
})

