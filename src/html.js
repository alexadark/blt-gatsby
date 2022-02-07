import React from "react";
import PropTypes from "prop-types";

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
        <script
          src="https://consent.cookiefirst.com/banner.js"
          data-cookiefirst-key="d9189a97-cf3d-4e69-ab78-38130e01274f"
        ></script>
        <script
          src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"
          type="text/javascript"
        ></script>

        <script
          id="mcjs"
          dangerouslySetInnerHTML={{
            __html: `          !function(c,h,i,m,p)
          {
            ((m = c.createElement(h)),
            (p = c.getElementsByTagName(h)[0]),
            (m.async = 1),
            (m.src = i),
            p.parentNode.insertBefore(m, p))
          }
          (document,"script","https://chimpstatic.com/mcjs-connected/js/users/41a2fd602212b6bd36c51b724/77104eceb0adda5b29b51b0a7.js");`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FNAME';ftypes[1]='text';fnames[2]='LNAME';ftypes[2]='text';fnames[6]='MMERGE6';ftypes[6]='text';fnames[7]='MMERGE7';ftypes[7]='text';fnames[4]='MMERGE4';ftypes[4]='date';fnames[3]='MMERGE3';ftypes[3]='address';fnames[5]='MMERGE5';ftypes[5]='date';fnames[9]='MMERGE9';ftypes[9]='date';fnames[10]='MMERGE10';ftypes[10]='date';fnames[11]='MMERGE11';ftypes[11]='date';fnames[12]='MMERGE12';ftypes[12]='date';fnames[13]='MMERGE13';ftypes[13]='date';fnames[14]='MMERGE14';ftypes[14]='date';fnames[15]='MMERGE15';ftypes[15]='radio';fnames[16]='MMERGE16';ftypes[16]='date';fnames[17]='MMERGE17';ftypes[17]='number';fnames[8]='MMERGE8';ftypes[8]='number';}(jQuery));var $mcj = jQuery.noConflict(true);
            `,
          }}
        />
      </body>
    </html>
  );
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
};
