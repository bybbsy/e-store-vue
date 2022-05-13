import { render, screen, fireEvent } from '@testing-library/vue';
// import {} from "@testing-library/vue/dist"
import Coupon from '../../components/Coupon.vue';


describe('Tests coupon component', () => {
  test('Testing availability of coupon button', () => {
    render(Coupon, {
      props: {
        coupon: {
          image: '',
          discount: {
            amount: 20,
            type: 'currency'
          },
          category: 'toys',
          dateExp: new Date(2023, 4, 1, 14),
          description: '100$ off for each toys you pick up. You can easily apply this coupon to the current products in the cart or delete it.'
        }
      },
      data() {
        return {
          expanded: true
        }
      }
    });

    const buttons = screen.getAllByRole('button')

    buttons.forEach(button => {
      button.click();
    })
  })


  test('Testing coupon description', () => {
    render(Coupon, {
      props: {
        coupon: {
          image: '',
          discount: {
            amount: 20,
            type: 'currency'
          },
          category: 'toys',
          dateExp: new Date(2023, 4, 1, 14),
          description: '100$ off for each toys you pick up. You can easily apply this coupon to the current products in the cart or delete it.'
        }
      },
      data() {
        return {
          expanded: false
        }
      }
    });

    const description = screen.getByRole('coupon-desc');

    expect(description).toBeTruthy();

    screen.debug();
  })
})

