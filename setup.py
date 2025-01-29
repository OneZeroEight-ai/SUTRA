from setuptools import setup, find_packages

setup(
    name="sutra",
    version="0.1.0",
    packages=find_packages(where="src"),
    package_dir={"": "src"},
    install_requires=[
        "numpy>=1.21.0",
        "pandas>=1.3.0",
        "web3>=6.0.0"
    ],
    author="OneZeroEight-ai",
    description="A token framework for AI alignment through preservation incentives",
    long_description=open("README.md").read(),
    long_description_content_type="text/markdown",
    url="https://github.com/OneZeroEight-ai/SUTRA",
    classifiers=[
        "Development Status :: 3 - Alpha",
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
    ],
)
