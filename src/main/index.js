'use strict'

import { app, BrowserWindow, ipcMain, shell, dialog } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    frame: false,
    transparent: true,
    height: 563,
    useContentSize: true,
    width: 1000
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

const fs = require('fs')
ipcMain.on('print-to-pdf', function (event, arg) {
  const pdfPath = dialog.showSaveDialog({
    title: '薪資條存檔',
    defaultPath: `${arg}.pdf`,
    filters: [{name: 'PDF', extensions: ['pdf']}]
  })
  if (pdfPath) {
    const win = BrowserWindow.fromWebContents(event.sender)
    win.webContents.printToPDF({printBackground: true, pageSize: 'A4', marginsType: 2, printSelectionOnly: false}, function (error, data) {
      if (error) throw error
      fs.writeFile(pdfPath, data, function (error) {
        if (error) {
          throw error
        }
        shell.openExternal('file://' + pdfPath)
        event.sender.send('wrote-pdf', pdfPath)
      })
    })
  }
})
