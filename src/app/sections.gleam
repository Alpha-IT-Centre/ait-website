import app/sections/info
import app/types.{type Msg}
import lustre/attribute.{class}
import lustre/element.{type Element, text}
import lustre/element/html

pub fn socials() -> Element(Msg) {
  html.div([], [text("socials")])
}

pub fn header() -> Element(Msg) {
  html.div([class("bg-white")], [text("header")])
}

pub fn menu() -> Element(Msg) {
  html.div([class("bg-brand")], [text("menu")])
}

pub fn carousel() -> Element(Msg) {
  html.div([], [text("carousel")])
}

pub fn contact_form() -> Element(Msg) {
  html.div([class("bg-darker")], [text("contact form")])
}

pub fn info() -> Element(Msg) {
  html.div([], [
    info.bus_support(),
    info.domain_services(),
    info.hosting(),
    info.data_centre(),
  ])
}
