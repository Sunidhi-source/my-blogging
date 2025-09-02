import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph, Undo,Link
     ,List,Heading,BlockQuote,Font  } from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';

function Editor({setContent,text}) {
    return (
        <CKEditor
            editor={ ClassicEditor }
            config={ {
                toolbar: [
                    'undo',
                    'redo',
                    'heading',
            '|',
            'bold',
            'italic',
            'fontSize',
            'fontFamily',
            'fontColor',
            '|',
            'link',
            'bulletedList',
            'numberedList',
            'blockQuote' ],
               
                plugins: [
                    Bold, Essentials, Italic, Mention, Paragraph, Undo,Link,List,Heading,
                    BlockQuote,Font  
                ],
                initialData: text,
            } }
            onChange={ ( event, editor ) => setContent(editor.getData()) }

        />
    );
}

export default Editor;
