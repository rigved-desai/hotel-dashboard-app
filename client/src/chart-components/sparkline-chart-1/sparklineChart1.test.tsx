import { render, screen } from "@testing-library/react";
import SparklineChart1 from "./sparklineChart1";
import ResizeObserver from 'resize-observer-polyfill';
import '@testing-library/jest-dom';

global.ResizeObserver = ResizeObserver;

describe('Sparkline Chart-1 tests', () => {

    test('check if sparkline chart component is rendering properly', () => {
        render(<SparklineChart1 startDate={new Date()} endDate={new Date()} />)
        expect(screen.getByTestId('sparkline-1')).toBeTruthy();
    });

});
