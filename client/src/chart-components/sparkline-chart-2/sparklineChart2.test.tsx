import { render, screen } from "@testing-library/react";
import SparklineChart2 from "./sparklineChart2";
import ResizeObserver from 'resize-observer-polyfill';
import '@testing-library/jest-dom';

global.ResizeObserver = ResizeObserver;

describe('Sparkline Chart-2 tests', () => {

    test('check if sparkline chart component is rendering properly', () => {
        render(<SparklineChart2 startDate={new Date()} endDate={new Date()} />)
        expect(screen.getByTestId('sparkline-2')).toBeTruthy();
    });

});