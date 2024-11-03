# openai[datalib]==0.28.1 ではimportに失敗するのでコメントアウト
# AssistantAPIを実装する場合はこのソースを使う

# from typing import Any
# from azure.search.documents.aio import SearchClient
# from core.modelhelper import get_token_limit
# from approaches.approach import AssistantApproach

# from openai import AzureOpenAI
# import os

# class AssistantApproach(AssistantApproach):

#   # def __init__(self, search_client: SearchClient, chatgpt_deployment: str, chatgpt_model: str, embedding_deployment: str, sourcepage_field: str, content_field: str):
#   #     self.search_client = search_client
#   #     self.chatgpt_deployment = chatgpt_deployment
#   #     self.chatgpt_model = chatgpt_model
#   #     self.embedding_deployment = embedding_deployment
#   #     self.sourcepage_field = sourcepage_field
#   #     self.content_field = content_field
#   #     self.chatgpt_token_limit = get_token_limit(chatgpt_model)

#   # async def run(self, history: list[dict[str, str]], overrides: dict[str, Any]) -> Any:
#   async def run(self) -> Any:

#     client = AzureOpenAI(
#         api_key=os.getenv("AZURE_OPENAI_API_KEY"),
#         api_version="2024-05-01-preview",
#         azure_endpoint = os.getenv("AZURE_OPENAI_ENDPOINT")
#         )

#     print(client.api_key)
#     # print(client.azure_endpoint)

#     # # Create a vector store called "Financial Statements"
#     # vector_store = client.beta.vector_stores.create(name="Financial Statements")
    
#     # # Ready the files for upload to OpenAI
#     # file_paths = ["c:\wrk\JS.txt"]
#     # file_streams = [open(path, "rb") for path in file_paths]
    
#     # # Use the upload and poll SDK helper to upload the files, add them to the vector store,
#     # # and poll the status of the file batch for completion.
#     # file_batch = client.beta.vector_stores.file_batches.upload_and_poll(
#     #   vector_store_id=vector_store.id, files=file_streams
#     # )
    
#     # # You can print the status and the file counts of the batch to see the result of this operation.
#     # print(file_batch.status)
#     # print(file_batch.file_counts)
#     # print(file_batch.vector_store_id)

#     assistant = client.beta.assistants.create(
#     name="Japanese Assistant",
#     instructions="日本語で回答してください。",
#     model="gpt-35-turbo-16k",
#     tools=[
#         {"type": "file_search"},
#         {"type": "code_interpreter"}
#     ]
# )

#     print(assistant.model_dump_json(indent=4))

#     # Upload the user provided file to OpenAI
#     message_file = client.files.create(
#       file=open("c:\wrk\JS.txt", "rb"), purpose="assistants"
#     )
    
#     # Create a thread and attach the file to the message
#     thread = client.beta.threads.create(
#       messages=[
#         {
#           "role": "user",
#           "content": "このファイルを要約してください",
#           # Attach the new file to the message.
#           "attachments": [
#             { "file_id": message_file.id, "tools": [{"type": "file_search"}] }
#           ],
#         }
#       ]
#     )
 
#     # The thread now has a vector store with that file in its tool resources.
#     print(thread.tool_resources.file_search)

#     run = client.beta.threads.runs.create_and_poll(
#         thread_id=thread.id, assistant_id=assistant.id
#     )

#     messages = list(client.beta.threads.messages.list(thread_id=thread.id, run_id=run.id))

#     message_content = messages.content.text
#     annotations = message_content.annotations
#     citations = []
#     for index, annotation in enumerate(annotations):
#         message_content.value = message_content.value.replace(annotation.text, f"[{index}]")
#         if file_citation := getattr(annotation, "file_citation", None):
#             cited_file = client.files.retrieve(file_citation.file_id)
#             citations.append(f"[{index}] {cited_file.filename}")

#     print(message_content.value)
#     print("\n".join(citations))

#     return {"data_points": "results", "answer": "chat_content", "thoughts": "Searched for"}
