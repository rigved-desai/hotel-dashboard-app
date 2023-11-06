import { render, screen } from "@testing-library/react";
import LineChart from "./lineChart";
import ResizeObserver from 'resize-observer-polyfill';
import '@testing-library/jest-dom';

global.ResizeObserver = ResizeObserver;

describe('Line chart tests', () => {

    test('check if line chart component is rendering properly', () => {
        render(<LineChart startDate={new Date()} endDate={new Date()} />)
        expect(screen.getByTestId('line-chart')).toBeTruthy();
    });

});