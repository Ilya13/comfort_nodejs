Set oShell = Wscript.CreateObject("WScript.Shell")
CommandLine = "%COMSPEC% /c node index.js"
oShell.Run CommandLine, 0, 0