import React from "react";
import './comments.css'
import { Media } from 'reactstrap';


const Comments = (props) => {
    return (
      <div className="wrapper">
      
       <p> HTML Emmet snippets
HTML custom snippets are applicable to all other markup flavors like haml or jade. When snippet value is an abbreviation and not actual HTML, the appropriate transformations can be applied to get the right output as per the language type.

For example, for an unordered list with a list item, if your snippet value is ul>li, you can use the same snippet in html, haml, jade or slim, but if your snippet value is <ul><li></li></ul>, then it will work only in html files.

If you want a snippet for plain text, then surround the text with the {}.

CSS Emmet snippets
Values for CSS Emmet snippets should be a complete property name and value pair.

CSS custom snippets are applicable to all other stylesheet flavors like scss, less or sass. Therefore, don't include a trailing ; at the end of the snippet value. Emmet will add it as needed based on the whether the language requires it.

Do not use : in the snippet name. : is used to separate property name and value when Emmet tries to fuzzy match the abbreviation to one of the snippets.

HTML Emmet snippets
HTML custom snippets are applicable to all other markup flavors like haml or jade. When snippet value is an abbreviation and not actual HTML, the appropriate transformations can be applied to get the right output as per the language type.

For example, for an unordered list with a list item, if your snippet value is ul>li, you can use the same snippet in html, haml, jade or slim, but if your snippet value is <ul><li></li></ul>, then it will work only in html files.

If you want a snippet for plain text, then surround the text with the {}.

CSS Emmet snippets
Values for CSS Emmet snippets should be a complete property name and value pair.

CSS custom snippets are applicable to all other stylesheet flavors like scss, less or sass. Therefore, don't include a trailing ; at the end of the snippet value. Emmet will add it as needed based on the whether the language requires it.

Do not use : in the snippet name. : is used to separate property name and value when Emmet tries to fuzzy match the abbreviation to one of the snippets.


        </p>
      </div>
    );
  };
  
  export default Comments;