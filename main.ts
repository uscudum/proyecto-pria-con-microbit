function controlConectado () {
    if (Temperatura > 30) {
        basic.showLeds(`
            . # . # .
            . . . . .
            . # # # .
            # . . . #
            . . . . #
            `)
    } else if (Humedad < 650) {
        basic.showLeds(`
            # # . # .
            # . . . .
            . # # # .
            # . . . #
            . . . . #
            `)
    } else if (Luminosidad < 5) {
        basic.showLeds(`
            # # . # #
            . . . . .
            . # # # .
            . . . . .
            . . . . #
            `)
    } else {
        basic.showLeds(`
            . . . . .
            . # . # .
            # . . . #
            . # # # .
            . . . . #
            `)
    }
}
bluetooth.onBluetoothConnected(function () {
    conectado = 1
})
bluetooth.onBluetoothDisconnected(function () {
    conectado = 0
})
function controlDesconectado () {
    if (Temperatura > 30) {
        basic.showLeds(`
            . # . # .
            . . . . .
            . # # # .
            # . . . #
            . . . . .
            `)
    } else if (Humedad < 650) {
        basic.showLeds(`
            # # . # .
            # . . . .
            . # # # .
            # . . . #
            . . . . .
            `)
    } else if (Luminosidad < 5) {
        basic.showLeds(`
            # # . # #
            . . . . .
            . # # # .
            . . . . .
            . . . . .
            `)
    } else {
        basic.showLeds(`
            . . . . .
            . # . # .
            # . . . #
            . # # # .
            . . . . .
            `)
    }
}
let conectado = 0
let Luminosidad = 0
let Humedad = 0
let Temperatura = 0
bluetooth.startTemperatureService()
bluetooth.startIOPinService()
basic.forever(function () {
    Temperatura = input.temperature()
    Humedad = pins.analogReadPin(AnalogPin.P0)
    Luminosidad = input.lightLevel()
    if (conectado == 1) {
        controlConectado()
    } else {
        controlDesconectado()
    }
    basic.pause(5000)
})
