from transformers import pipeline


def load_model():
    model_tag = "postbot/distilgpt2-emailgen-V2"
    generator = pipeline(
        "text-generation",
        model=model_tag,
    )
    return generator


generator = load_model()


def run_model(tone):
    prompt = f"""
    Hello,

    Following up on the bubblegum shipment.

    """

    result = generator(
        prompt,
        max_length=64,
        do_sample=False,
        early_stopping=True,
    )

    # generate
    print(result[0]["generated_text"])


run_model("Formal")
