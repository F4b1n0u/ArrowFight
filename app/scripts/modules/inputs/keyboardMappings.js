'use strict';

define(function (require) {

    var keyboardMappings = {
        red: {
            button: [
                {
                    action: 'start',
                    key: 'enter',
                    max: true,
                    min: false
                },
                {
                    action: 'jump',
                    key: 'r',
                    max: true,
                    min: false
                },
                {
                    action: 'fire',
                    key: 'f',
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
        green: {
            button: [
                {
                    action: 'start',
                    key: 'enter',
                    max: true,
                    min: false
                },
                {
                    action: 'jump',
                    key: 'p',
                    max: true,
                    min: false
                },
                {
                    action: 'fire',
                    key: 'm',
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
