import { useState, useRef } from "react";
import { Stack, TextField } from "@fluentui/react";
import { Send28Filled, DocumentAdd28Filled } from "@fluentui/react-icons";

import styles from "./QuestionInput2.module.css";

interface Props {
    onSend: (question: string) => void;
    disabled: boolean;
    placeholder?: string;
    clearOnSend?: boolean;
    handleFilesChange: (files: FileList) => void;
}

export const QuestionInput2 = ({ onSend, disabled, placeholder, clearOnSend, handleFilesChange }: Props) => {
    const [question, setQuestion] = useState<string>("");

    const [composing, setComposition] = useState(false);
    const startComposition = () => setComposition(true);
    const endComposition = () => setComposition(false);

    const sendQuestion = () => {
        if (disabled || !question.trim()) {
            return;
        }

        onSend(question);

        if (clearOnSend) {
            setQuestion("");
        }
    };

    const onEnterPress = (ev: React.KeyboardEvent<Element>) => {
        if (ev.key === "Enter" && !ev.shiftKey && !composing) {
            ev.preventDefault();
            sendQuestion();
        }
    };

    const onQuestionChange = (_ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        if (!newValue) {
            setQuestion("");
        } else if (newValue.length <= 1000) {
            setQuestion(newValue);
        }
    };

    const sendQuestionDisabled = disabled || !question.trim();

    const inputRef = useRef<HTMLInputElement>(null);
    const [filename, setFilename] = useState("");

    const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files !== null) {
            //アップしたファイル名を画面に表示
            setFilename("name:" + e.target.files[0].name);
            handleFilesChange(e.target.files);
            //sendするときに、ファイルがアップされていればassistantAIを呼ぶように分岐する
        } else {
            alert("nothing");
        }
    };

    const fileUpload = () => {
        // console.log(inputRef.current);
        inputRef?.current?.click();
    };

    return (
        <Stack horizontal className={styles.questionInputContainer}>
            <TextField
                className={styles.questionInputTextArea}
                placeholder={placeholder}
                multiline
                resizable={false}
                borderless
                value={question}
                onChange={onQuestionChange}
                onKeyDown={onEnterPress}
                onCompositionStart={startComposition}
                onCompositionEnd={endComposition}
            />
            <div className={styles.questionInputButtonsContainer}>
                <div
                    className={`${styles.questionInputSendButton} ${sendQuestionDisabled ? styles.questionInputSendButtonDisabled : ""}`}
                    aria-label="Ask question button"
                    onClick={sendQuestion}
                >
                    <Send28Filled primaryFill="rgba(115, 118, 225, 1)" />
                </div>
                <div className={`${styles.questionInputSendButton} `} onClick={fileUpload}>
                    <DocumentAdd28Filled primaryFill="rgba(115, 118, 225, 1)" />
                    <input hidden ref={inputRef} type="file" onChange={onFileInputChange} />
                </div>
            </div>
            <div>{filename}</div>
        </Stack>
    );
};
