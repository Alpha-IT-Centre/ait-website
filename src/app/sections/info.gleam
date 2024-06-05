import app/types.{type Msg}
import lustre/attribute.{class}
import lustre/element.{type Element, text}
import lustre/element/html

pub fn bus_support() -> Element(Msg) {
  html.div([class("bg-brand")], [text("business support")])
}

pub fn hosting() -> Element(Msg) {
  html.div([class("bg-light")], [text("hosting services")])
}

pub fn data_centre() -> Element(Msg) {
  html.div([class("bg-light")], [text("data centre")])
}

pub fn domain_services() -> Element(Msg) {
  html.div([class("bg-light")], [text("domain services")])
}
