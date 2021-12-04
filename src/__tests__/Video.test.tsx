import { render } from '@testing-library/react';
import Video from '../components/Video';

test('renders video', () => {
    render(<Video />);
    expect(true).toBe(true);
});
