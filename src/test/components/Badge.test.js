import { render, screen } from '@testing-library/vue';
// import {} from "@testing-library/vue/dist"
import Badge from '../../components/Badge.vue';

test('renders badge component', () => {
  const { debug } = render(Badge, {
    props: {
      value: 'asdasdsa'
    }
  });


  screen.debug();
})

