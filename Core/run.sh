#!/bin/bash
cd /var/www/WakeWise/Core
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
sudo venv/bin/python3 core.py