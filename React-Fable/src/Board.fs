module Board

open Feliz
open Square

[<ReactComponent>]
let Board (squares:string list) (onClick:int -> unit) =
    let renderSquare (i) =
        Square (squares |> List.item i) (fun _ -> onClick i)

    Html.div [
        Html.div [
            prop.className "board-row"
            prop.children [
                renderSquare 0
                renderSquare 1
                renderSquare 2
            ]
        ]
        Html.div [
            prop.className "board-row"
            prop.children [
                renderSquare 3
                renderSquare 4
                renderSquare 5
            ]
        ]
        Html.div [
            prop.className "board-row"
            prop.children [
                renderSquare 6
                renderSquare 7
                renderSquare 8
            ]
        ]
    ]