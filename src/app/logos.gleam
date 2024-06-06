import lustre/attribute.{attribute, class}
import lustre/element/html
import lustre/element/svg

pub fn facebook(classes: String) {
  html.svg(
    [
      class(classes),
      attribute("viewBox", "0 0 448 512"),
      attribute("xmlns", "http://www.w3.org/2000/svg"),
    ],
    [
      svg.path([
        attribute(
          "d",
          "M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64h98.2V334.2H109.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H255V480H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z",
        ),
      ]),
    ],
  )
}

pub fn linkedin(classes: String) {
  html.svg(
    [
      class(classes),
      attribute("viewBox", "0 0 448 512"),
      attribute("xmlns", "http://www.w3.org/2000/svg"),
    ],
    [
      svg.path([
        attribute(
          "d",
          "M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z",
        ),
      ]),
    ],
  )
}

pub fn x(classes: String) {
  html.svg(
    [
      class(classes),
      attribute("viewBox", "0 0 448 512"),
      attribute("xmlns", "http://www.w3.org/2000/svg"),
    ],
    [
      svg.path([
        attribute(
          "d",
          "M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm297.1 84L257.3 234.6 379.4 396H283.8L209 298.1 123.3 396H75.8l111-126.9L69.7 116h98l67.7 89.5L313.6 116h47.5zM323.3 367.6L153.4 142.9H125.1L296.9 367.6h26.3z",
        ),
      ]),
    ],
  )
}

pub fn alpha_it_centre(classes: String) {
  html.svg(
    [
      class(classes),
      attribute("stroke-miterlimit", "2"),
      attribute("stroke-linejoin", "round"),
      attribute("clip-rule", "evenodd"),
      attribute("fill-rule", "evenodd"),
      attribute("xmlns", "http://www.w3.org/2000/svg"),
      attribute("viewBox", "0 0 1837 316"),
    ],
    [
      svg.g([attribute("transform", "translate(-362.729 -1184.57)")], [
        svg.path([
          attribute("d", "M362.729 1184.57h1836.9v315.86h-1836.9z"),
          attribute("fill", "none"),
        ]),
        svg.clip_path([attribute("id", "a")], [
          svg.path([attribute("d", "M362.729 1184.57h1836.9v315.86h-1836.9z")]),
        ]),
        svg.g([attribute("clip-path", "url(#a)")], [
          svg.path([
            attribute(
              "d",
              "M570.638 1239.231c18.466-32.31 53.258-54.1 93.099-54.1 53.18 0 97.363 38.827 105.721 89.656a88.235 88.235 0 0115.357-1.34c48.463 0 87.808 39.343 87.808 87.807 0 1.134-.023 2.262-.064 3.382 19.496 13.495 32.273 36.018 32.273 61.499 0 40.411-32.145 73.379-72.242 74.7v.155H445.517v-.526c-46.017-4.377-82.063-43.184-82.063-90.34 0-44.928 32.72-82.275 75.605-89.49a89.887 89.887 0 01-.02-1.943c0-49.552 40.231-89.785 89.786-89.785 15.095 0 29.323 3.733 41.813 10.325zm182.826 136.83v-6.257c0-3.457-2.8-6.257-6.26-6.257h-109.52v-28.165h28.162c6.912 0 12.517-5.605 12.517-12.517v-37.55c0-6.911-5.605-12.516-12.517-12.516h-75.1c-6.913 0-12.519 5.605-12.519 12.517v37.549c0 6.912 5.606 12.517 12.518 12.517h28.161v28.165H509.387c-3.457 0-6.26 2.8-6.26 6.257v6.257a6.26 6.26 0 006.26 6.26h40.68v28.162h-21.905c-6.912 0-12.517 5.605-12.517 12.518v37.55c0 6.912 5.605 12.518 12.517 12.518h62.583c6.912 0 12.518-5.606 12.518-12.518V1423c0-6.913-5.606-12.518-12.518-12.518h-21.904v-28.161H687.75v28.16h-21.903c-6.913 0-12.518 5.606-12.518 12.519v37.55c0 6.912 5.605 12.518 12.518 12.518h62.585c6.91 0 12.515-5.606 12.515-12.518V1423c0-6.913-5.605-12.518-12.515-12.518h-21.906v-28.161h40.679c3.46 0 6.26-2.803 6.26-6.26zm-168.976 53.197v25.035H534.42v-25.035h50.068zm137.683 0v25.035h-50.068v-25.035h50.068zm-125.168-137.684h62.585v25.033h-62.585v-25.033z",
            ),
          ]),
          svg.path([
            attribute("fill-rule", "nonzero"),
            attribute(
              "d",
              "M1042.482 1297.91l23.013 154.263h-40.955l-2.145-27.693h-14.432l-2.34 27.693h-41.54l20.477-154.263h57.922zm-21.257 99.267c-1.95-17.552-3.9-39.005-6.046-64.748-4.096 29.449-6.63 51.096-7.606 64.748h13.652zM1071.114 1297.91h39.59v154.263h-39.59zM1163.736 1325.798l-.78 11.117c3.51-4.486 7.216-7.801 11.506-10.141 4.096-2.146 8.581-3.316 13.457-3.316 5.85 0 11.116 1.755 15.407 4.876 4.485 3.12 7.02 6.826 8.19 11.116.976 4.096 1.56 11.311 1.56 21.258v53.24c0 11.507-.584 19.698-1.95 24.574-1.365 4.875-4.29 8.776-8.385 11.701-4.29 2.73-9.361 4.29-15.407 4.29-4.68 0-9.166-1.17-13.067-3.315-4.095-2.34-7.8-5.656-11.311-9.946v28.863h-38.42v-144.317h39.2zm10.921 36.86c0-7.996-.195-12.677-.78-14.237-.585-1.755-2.145-2.535-4.875-2.535-2.536 0-4.096.975-4.876 2.925-.78 1.755-1.17 6.436-1.17 13.847v52.266c0 7.606.39 12.481 1.17 14.237.78 1.95 2.535 2.925 5.07 2.925 2.341 0 3.901-.975 4.486-2.535.585-1.756.975-6.046.975-12.872v-54.021zM1264.181 1297.91v34.714c3.316-2.925 7.021-5.265 10.726-6.826 3.9-1.56 7.996-2.34 12.482-2.34 6.63 0 12.286 1.755 17.162 5.266 4.68 3.315 7.606 7.41 8.58 11.701 1.171 4.486 1.561 12.677 1.561 24.573v87.175h-38.42v-88.93c0-7.411-.39-12.092-1.17-14.237-.585-2.145-2.34-3.12-4.875-3.12-2.34 0-3.9 1.17-4.68 3.315-.78 2.145-1.366 6.436-1.366 12.872v90.1h-38.42V1297.91h38.42zM1362.26 1374.75h-36.078v-8.387c0-9.946 1.17-17.357 3.51-22.622 2.145-5.461 6.63-10.142 13.457-14.042 6.825-4.096 15.601-6.24 26.523-6.24 13.066 0 22.817 2.34 29.448 7.02 6.631 4.486 10.531 10.141 11.897 16.967 1.365 6.63 1.95 20.477 1.95 41.345v63.382h-37.445v-11.311c-2.34 4.485-5.265 7.996-8.97 10.141-3.706 2.34-8.192 3.51-13.262 3.51-6.826 0-13.067-1.95-18.527-5.655-5.656-3.9-8.581-12.092-8.581-24.963v-10.336c0-9.361 1.56-15.797 4.485-19.308 3.12-3.315 10.531-7.41 22.233-11.896 12.676-5.07 19.502-8.386 20.282-10.141.975-1.56 1.365-5.07 1.365-10.336 0-6.631-.585-10.922-1.56-13.067-.975-1.95-2.535-2.925-4.875-2.925-2.536 0-4.096.78-4.876 2.535-.585 1.755-.975 6.046-.975 13.067v13.261zm12.287 17.356c-6.24 4.486-9.75 8.191-10.726 11.312-.975 3.12-1.56 7.41-1.56 13.066 0 6.63.585 10.921 1.365 12.677.78 1.95 2.535 2.925 5.07 2.925 2.536 0 4.096-.78 4.681-2.34.78-1.366 1.17-5.266 1.17-11.702v-25.938zM1461.759 1297.91h40.174v154.263h-40.174zM1598.681 1297.91v31.009h-23.792v123.254h-40.175V1328.92h-23.598v-31.009h87.565zM1735.822 1365.193h-40.175v-26.913c0-7.801-.39-12.677-1.17-14.432-.975-1.95-2.73-2.925-5.656-2.925-3.315 0-5.46 1.17-6.24 3.51-.976 2.34-1.366 7.411-1.366 15.212v71.573c0 7.411.39 12.482 1.365 14.627.78 2.34 2.73 3.51 5.851 3.51 3.12 0 5.07-1.17 5.85-3.51.976-2.34 1.366-7.606 1.366-16.187v-19.307h40.175v6.046c0 15.992-1.17 27.303-3.316 33.934-2.34 6.63-7.216 12.481-15.017 17.552-7.8 5.07-17.162 7.606-28.473 7.606-11.701 0-21.452-2.146-29.058-6.436-7.606-4.29-12.677-10.141-15.212-17.747-2.34-7.411-3.706-18.722-3.706-33.934v-45.05c0-11.117.39-19.308 1.17-24.963.78-5.461 3.12-10.922 6.826-15.992 3.706-5.266 8.971-9.166 15.602-12.092 6.826-3.12 14.432-4.485 23.208-4.485 11.701 0 21.452 2.34 29.253 6.826 7.606 4.485 12.677 10.336 15.017 17.162 2.535 6.63 3.706 17.357 3.706 31.788v14.627zM1836.203 1391.131h-49.731v27.498c0 5.656.39 9.361 1.17 10.922.78 1.755 2.34 2.535 4.68 2.535 2.926 0 4.876-1.17 5.851-3.315.975-2.146 1.56-6.436 1.56-12.677v-16.772h36.47v9.361c0 7.801-.586 13.847-1.56 18.137-.976 4.096-3.121 8.581-6.826 13.262-3.706 4.875-8.191 8.386-13.847 10.726-5.46 2.535-12.482 3.706-20.868 3.706-7.995 0-15.211-1.17-21.452-3.51-6.24-2.341-11.116-5.657-14.627-9.752-3.315-4.096-5.85-8.581-7.02-13.457-1.366-4.875-2.146-12.091-2.146-21.452v-36.86c0-11.116 1.56-19.892 4.486-26.132 3.12-6.436 7.996-11.312 14.626-14.822 6.826-3.316 14.627-5.07 23.598-5.07 10.726 0 19.697 2.144 26.718 6.24 6.826 4.095 11.897 9.556 14.627 16.187 2.925 6.826 4.29 16.382 4.29 28.668v16.577zm-38.615-20.477v-9.166c0-6.631-.39-10.922-.975-12.677-.78-1.95-2.145-2.925-4.29-2.925-2.73 0-4.291.78-5.071 2.535-.585 1.56-.78 5.85-.78 13.067v9.166h11.116zM1887.928 1325.798l-.78 11.702c2.925-4.68 6.24-8.191 10.336-10.531s8.581-3.51 13.847-3.51c6.63 0 12.091 1.56 16.187 4.68 4.29 3.12 7.02 7.02 8.19 11.896 1.17 4.68 1.756 12.482 1.756 23.598v88.54h-38.42v-87.565c0-8.581-.195-14.042-.78-15.797-.585-1.95-2.145-2.925-4.875-2.925s-4.486 1.17-5.07 3.315c-.78 2.145-1.17 7.996-1.17 17.552v85.42h-38.42v-126.375h39.2zM1991.282 1309.027v19.892h10.336v19.892h-10.336v67.673c0 8.386.39 12.872 1.365 13.847.78.975 4.29 1.56 10.726 1.56v20.282h-15.602c-8.776 0-15.016-.39-18.722-1.17-3.705-.585-7.02-2.34-9.946-4.875-2.925-2.73-4.68-5.656-5.266-9.167-.78-3.315-1.17-11.31-1.17-23.987v-64.163h-8.19v-19.892h8.19v-19.892h38.615zM2048.557 1325.798l-1.365 16.577c5.46-11.896 13.652-18.137 24.183-18.917v44.465c-7.02 0-12.286.976-15.407 2.926-3.315 1.95-5.46 4.485-6.24 7.996-.78 3.315-1.17 11.116-1.17 23.402v49.926h-38.42v-126.375h38.42zM2167.112 1391.131h-49.731v27.498c0 5.656.39 9.361 1.17 10.922.78 1.755 2.34 2.535 4.68 2.535 2.926 0 4.876-1.17 5.851-3.315.975-2.146 1.56-6.436 1.56-12.677v-16.772h36.47v9.361c0 7.801-.585 13.847-1.56 18.137-.976 4.096-3.12 8.581-6.826 13.262-3.706 4.875-8.191 8.386-13.847 10.726-5.46 2.535-12.481 3.706-20.867 3.706-7.996 0-15.212-1.17-21.453-3.51-6.24-2.341-11.116-5.657-14.627-9.752-3.315-4.096-5.85-8.581-7.02-13.457-1.366-4.875-2.146-12.091-2.146-21.452v-36.86c0-11.116 1.56-19.892 4.486-26.132 3.12-6.436 7.996-11.312 14.627-14.822 6.825-3.316 14.626-5.07 23.597-5.07 10.727 0 19.698 2.144 26.718 6.24 6.826 4.095 11.897 9.556 14.627 16.187 2.925 6.826 4.29 16.382 4.29 28.668v16.577zm-38.615-20.477v-9.166c0-6.631-.39-10.922-.975-12.677-.78-1.95-2.145-2.925-4.29-2.925-2.73 0-4.291.78-5.071 2.535-.585 1.56-.78 5.85-.78 13.067v9.166h11.116z",
            ),
          ]),
        ]),
      ]),
    ],
  )
}
