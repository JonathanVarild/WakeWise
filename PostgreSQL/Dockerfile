FROM postgres:16

ARG DEV_SCRIPTS=false

COPY initdb/ /docker-entrypoint-initdb.d/

COPY dev_initdb/ /tmp/dev_initdb/
RUN if [ "$DEV_SCRIPTS" = "true" ]; then \
		cp -r /tmp/dev_initdb/* /docker-entrypoint-initdb.d/; \
	fi
