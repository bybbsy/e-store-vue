import { render, screen } from '@testing-library/vue';
// import {} from "@testing-library/vue/dist"
import Badge from '../../components/Badge.vue';

test('renders badge component', () => {
  render(Badge, {
    props: {
      value: 'asdasdsa'
    }
  });

  // const b = screen.queryByText('asdasdsa');
  // expect(screen.queryByText(props.value)).toBeTruthy();
  // screen.debug();
})

