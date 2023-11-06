import {render, screen } from "@testing-library/react";
import ColumnChart from "./columnChart";
import ResizeObserver from 'resize-observer-polyfill';
import '@testing-library/jest-dom'

global.ResizeObserver = ResizeObserver;

describe('Column chart tests', () => {

    test('check if column chart component is rendering properly', async () => {
        render(<ColumnChart startDate={new Date()} endDate={new Date()} />)
        expect(screen.getByTestId('column-chart')).toBeTruthy();
    });

});



