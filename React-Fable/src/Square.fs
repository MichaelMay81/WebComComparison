module Square

open Browser.Types
open Feliz

[<ReactComponent>]
let Square (value:string) (onClick:MouseEvent -> unit) =
    Html.button [
        prop.className "square"
        prop.onClick onClick
        prop.children [ Html.text value] ]