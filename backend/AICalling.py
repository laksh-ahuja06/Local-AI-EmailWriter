import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

MODEL = "Qwen/Qwen2.5-1.5B"

dtype = (
    torch.bfloat16
    if torch.cuda.is_available() and torch.cuda.is_bf16_supported()
    else torch.float16
    if torch.cuda.is_available()
    else torch.float32
)


def load_model():
    global tokenizer, model
    tokenizer = AutoTokenizer.from_pretrained(MODEL)
    model = AutoModelForCausalLM.from_pretrained(
        MODEL,
        torch_dtype=torch.bfloat16,
        device_map="auto",
    )


def run_model(prompt, tone):
    finalPrompt = f"""You are a professional email writer.
    Write a single complete email based on the user's request.
    Requirements:
    - Output only the email.
    - Start with an appropriate greeting addressed to the intended recipient.
    - Use the requested tone.
    - Do not repeat or summarize the user's request.
    - Do not include explanations, notes, or markdown.
    - End with a suitable closing followed by the sender's name.
    - Stop after the sender's name.

    User request: {prompt}
    Tone: {tone}
    """

    print(finalPrompt)

    inputs = tokenizer(finalPrompt, return_tensors="pt").to(model.device)

    outputs = model.generate(
        **inputs,
        max_new_tokens=300,
        temperature=0.2,
        top_p=1.0,
        do_sample=True,
    )

    generated = outputs[0][inputs["input_ids"].shape[1] :]
    response = tokenizer.decode(generated, skip_special_tokens=True)

    print(response)

    return response
