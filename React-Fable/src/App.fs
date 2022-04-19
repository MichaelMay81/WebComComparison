module App

open Browser.Dom
open Fable.Core
open Feliz
open Square

let [<Global("calculateWinner")>] calculateWinner(squares: string []): string option = jsNative

[<ReactComponent>]
let Board() =
    let (squares, setSquares) = React.useState(List.replicate 9 "")
    let (xIsNext, setXisNext) = React.useState(true)

    let winner = calculateWinner(squares |> List.toArray)

    let handleClick i =
        match winner, (squares |> List.item i) with
        | None, "" ->
            setSquares (squares |> List.updateAt i (if xIsNext then "X" else "O"))
            setXisNext (not xIsNext)
        | _, _ -> ()

    let renderSquare (i) =
        Square
            (squares |> List.item i)
            (fun _ -> handleClick i)

    let status =
        match winner with
        | Some winner ->
            $"Winner: {winner}"
        | None ->
            $"""Next player: {if xIsNext then "X" else "O"}"""

    Html.div [
        Html.div [
            prop.className "status"
            prop.children [ Html.text status ]
        ]
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

[<ReactComponent>]
let Game() =
    Html.div [
        prop.className "game"
        prop.children [
            Html.div [
                prop.className "game-board"
                prop.children [ Board () ]
            ]
            Html.div [
                prop.className "game-info"
                prop.children [
                    Html.div [ Html.text "status" ]
                    Html.ol [ Html.text "TODO" ]
                ]
            ]
        ]
    ]

ReactDOM.render(Game(), document.getElementById "root")