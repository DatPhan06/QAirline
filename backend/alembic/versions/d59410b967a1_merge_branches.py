"""Merge branches

Revision ID: d59410b967a1
Revises: 89d11f36a5cf, cd887a88723a, fa6914b60ffd
Create Date: 2024-12-20 15:54:22.235820

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'd59410b967a1'
down_revision: Union[str, None] = ('89d11f36a5cf', 'cd887a88723a', 'fa6914b60ffd')
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
