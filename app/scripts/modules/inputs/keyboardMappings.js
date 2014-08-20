'use strict';

define(function (require) {

    var keyboardMappings = {
        green: {
            button: [
                {
                    action: 'start',
                    key: 'y',
                    max: true,
                    min: false
                },
                {
                    action: 'jump',
                    key: 'c',
                    max: true,
                    min: false
                },
                {
                    action: 'fire',
                    key: 'v',
                    max: true,
                    min: false
                },
            ],
            joystick: [
                {
                    axe: 'vertical',
                    key: 'z',
                    max: -1,
                    min: 0
                },
                {
                    axe: 'vertical',
                    key: 's',
                    max: 1,
                    min: 0
                },
                {
                    axe: 'horizontal',
                    key: 'd',
                    max: 1,
                    min: 0
                },
                {
                    axe: 'horizontal',
                    key: 'q',
                    max: -1,
                    min: 0
                }
            ]
        },
        red: {
            button: [
                {
                    action: 'jump',
                    key: 'o',
                    max: true,
                    min: false
                },
                {
                    action: 'fire',
                    key: 'l',
                    max: true,
                    min: false
                },
            ],
            joystick: [
                {
                    axe: 'vertical',
                    key: 'up',
                    max: -1,
                    min: 0
                },
                {
                    axe: 'vertical',
                    key: 'down',
                    max: 1,
                    min: 0
                },
                {
                    axe: 'horizontal',
                    key: 'right',
                    max: 1,
                    min: 0
                },
                {
                    axe: 'horizontal',
                    key: 'left',
                    max: -1,
                    min: 0
                }
            ]
        }
    }

    return keyboardMappings;
} );
