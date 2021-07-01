printf '> #!/bin/sh
> 
> node --input-type=module -e '"'"'
> 
> /*jslint devel*/
> import jslint from "./jslint.mjs";
> let code = "console.log(\\u0027hello world\\u0027);\\n";
> let result = jslint(code);
> result.warnings.forEach(function ({
>     formatted_message
> }) {
>     console.error(formatted_message);
> });
> 
> '"'"'


'
#!/bin/sh

node --input-type=module -e '

/*jslint devel*/
import jslint from "./jslint.mjs";
let code = "console.log(\u0027hello world\u0027);\n";
let result = jslint(code);
result.warnings.forEach(function ({
    formatted_message
}) {
    console.error(formatted_message);
});

'
